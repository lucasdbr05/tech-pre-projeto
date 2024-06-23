import { Field } from "formik";
import styles from "./input.module.css";
import { TextField, TextFieldProps, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
type props = {
    error: string | undefined;
    value: string;
    handleChange: any;
    name: string
};

type InputProps = {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    error?: string | undefined;
    handleChange?: any;
    type?: "text" | "email" | "password";
};

const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label': {
            color: 'white',
            },
            '& label.Mui-focused': {
            color: 'white',
            },

            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
            },
        },
    },
      },
    },
  });



export default function Input({name, label, className, disabled, error, placeholder = "", handleChange, type="text" }: InputProps) {
    const [value, setValue] = useState<string>();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Field name={name} type={type}>
                    {({field, form}: any) => (
                        <TextField 
                        {...field}
                        name={field.name}
                        label={label}
                        value={field.value}
                        onChange={handleChange}
                        disabled={disabled}
                        error={error}
                        type={type}
                        placeholder={placeholder}
                        InputProps={{
                            className: className,
                            }}
                            
                            />
                            )}
                </Field>
            </ThemeProvider>
        </div>
    )
}
