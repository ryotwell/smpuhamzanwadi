import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const plugins = [
  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
  'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
];

function handleTinyMceImageUpload(blobInfo: any, progress: (percent: number) => void) {
  return new Promise<string>(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    try {
      // Use XMLHttpRequest to support progress updates
      const xhr = new XMLHttpRequest();

      xhr.open('POST', '/api/upload', true);

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable && typeof progress === 'function') {
          // percent is an integer
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          progress(percentComplete);
        }
      };

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            // Use the fullUrl field ONLY, as per API example response
            if (data && data.data && data.data.fullUrl) {
              resolve(data.data.fullUrl);
            } else {
              reject(
                (data && data.message) ||
                'Upload failed, server did not return a valid image URL'
              );
            }
          } catch (err) {
            reject('Upload failed: Invalid JSON response');
          }
        } else {
          let message = 'Upload failed';
          try {
            const resData = JSON.parse(xhr.responseText);
            message = resData.message || message;
          } catch (e) {}
          reject(`HTTP error: ${xhr.status} ${message}`);
        }
      };

      xhr.onerror = function () {
        reject('Upload failed: Network error');
      };

      xhr.send(formData);
    } catch (err: any) {
      reject(`Upload failed: ${err.message}`);
    }
  });
}

export default function EditorComponent({ value, onChange, placeholder, className }: EditorProps) {
  return (
    <Editor
      apiKey='unuiemd4czonhcsa3vt235khp53wbkiwbv2m92bo47outejr'
      init={{
        plugins,
        menubar: false,
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media image table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        placeholder,
        images_upload_handler: handleTinyMceImageUpload,
        file_picker_types: 'image media',
        file_picker_callback: (callback: (url: string, meta: any) => void, value: any, meta: any) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          if (meta.filetype === 'image') {
            input.setAttribute('accept', 'image/*');
          }
          input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (!target.files || !target.files[0]) return;
            const file = target.files[0];
            const formData = new FormData();
            formData.append('file', file, file.name);

            // Use XMLHttpRequest in file_picker_callback too so progress could be added if needed
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/upload', true);
            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const data = JSON.parse(xhr.responseText);

                  let imageUrl = data.url;
                  if (!imageUrl && data.data && data.data.url) imageUrl = data.data.url;
                  if (!imageUrl && data.data && data.data.path) imageUrl = data.data.path;
                  if (!imageUrl && data.data && data.data.fullUrl) imageUrl = data.data.fullUrl;
                  if (imageUrl) {
                    callback(imageUrl, { title: file.name });
                  } else {
                    callback('', { title: '' });
                    alert(
                      data && data.message
                        ? data.message
                        : "Upload failed: no URL (media embed 400 error?)"
                    );
                  }
                } catch (e) {
                  callback('', { title: '' });
                  alert("Upload failed: Invalid JSON response");
                }
              } else {
                let message = "Upload failed";
                try {
                  const data = JSON.parse(xhr.responseText);
                  message = data && data.message ? data.message : message;
                } catch (e) {}
                callback('', { title: '' });
                alert(`HTTP error: ${xhr.status} ${message}`);
              }
            };
            xhr.onerror = function () {
              callback('', { title: '' });
              alert("Upload failed: Network error");
            };
            xhr.send(formData);
          };
          input.click();
        },
        automatic_uploads: true,
      }}
      value={value}
      onEditorChange={onChange}
      textareaName="content"
    />
  );
}