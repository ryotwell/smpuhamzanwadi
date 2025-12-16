import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useFaqStore } from "@/store/useFaqStore";
import { FaqFields, faqSchema } from "../app/admin/faqs/comps/form";
import { Faq } from "@/types/model";

type FaqFormMode = "CREATE" | "UPDATE";

interface UseFaqProps {
    faq?: Faq;
    formMode: FaqFormMode;
    onSuccess?: () => void;
}

const useFaq = ({ faq, formMode, onSuccess }: UseFaqProps) => {
    const { addFaq, updateFaq } = useFaqStore();

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<FaqFields>({
        resolver: zodResolver(faqSchema),
        defaultValues: {
            question: faq?.question || "",
            answer: faq?.answer || "",
        },
    });

    const onSubmit: SubmitHandler<FaqFields> = async (data) => {
        try {
            if (formMode === "CREATE") {
                const newFaq = await addFaq(data);
                if (newFaq) {
                    toast.success("Faq successfully created");
                    reset();
                    if (onSuccess) onSuccess();
                }
            } else {
                if (!faq?.id) return;
                const updatedFaq = await updateFaq(faq.id, data);
                if (updatedFaq) {
                    toast.success("Faq successfully updated");
                    if (onSuccess) onSuccess();
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        control,
        setValue,
        onSubmit: handleSubmit(onSubmit),
    };
};

export default useFaq;
