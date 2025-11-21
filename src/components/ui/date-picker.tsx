import React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

export interface DatePickerProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
    label?: string;
    id?: string;
    minYear?: number;
    maxYear?: number;
    placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    error,
    label = "Tanggal",
    id = "date-picker",
    minYear = 1970,
    maxYear = new Date().getFullYear(),
    placeholder = "Pilih tanggal",
}) => {
    const [open, setOpen] = React.useState(false);

    // If value is ISO string, parse it, otherwise undefined
    const date = value ? new Date(value) : undefined;

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="mb-1 font-medium text-sm">
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={id}
                        type="button"
                        className={`w-48 justify-between font-normal ${error ? "border-red-500" : ""}`}
                    >
                        {date
                            ? date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
                            : placeholder}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(d: Date | undefined) => {
                            if (d) {
                                // Emit ISO string
                                onChange(d.toISOString());
                            }
                            setOpen(false);
                        }}
                        fromYear={minYear}
                        toYear={maxYear}
                    />
                </PopoverContent>
            </Popover>
            {error && <p className="text-red-600 dark:text-red-400 text-xs">{error}</p>}
        </div>
    );
};
