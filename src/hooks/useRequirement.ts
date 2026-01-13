import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRequirementStore } from "@/store/useRequirementStore";
import { RequirementFields, requirementSchema } from "../app/admin/requirements/comps/form";
import { Requirement } from "@/types/model";

type RequirementFormMode = "CREATE" | "UPDATE";

interface UseRequirementProps {
    requirement?: Requirement;
    formMode: RequirementFormMode;
    onSuccess?: () => void;
}

const useRequirement = ({ requirement, formMode, onSuccess }: UseRequirementProps) => {
    const { addRequirement, updateRequirement } = useRequirementStore();

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<RequirementFields>({
        resolver: zodResolver(requirementSchema),
        defaultValues: {
            description: requirement?.description || "",
        },
    });

    const onSubmit: SubmitHandler<RequirementFields> = async (data) => {
        try {
            if (formMode === "CREATE") {
                const newRequirement = await addRequirement(data);
                if (newRequirement) {
                    toast.success("Requirement successfully created");
                    reset();
                    if (onSuccess) onSuccess();
                }
            } else {
                if (!requirement?.id) return;
                const updatedRequirement = await updateRequirement(requirement.id, data);
                if (updatedRequirement) {
                    toast.success("Requirement successfully updated");
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

export default useRequirement;
