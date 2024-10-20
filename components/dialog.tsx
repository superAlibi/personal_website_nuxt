import { JSX } from "preact/jsx-runtime";

export interface DialogProp extends
  Omit<
    JSX.HTMLAttributes<HTMLDialogElement>,
    "className"
  > {
  children: any;
}
export function Dialog({ children, ...props }: DialogProp) {
  return (
    <dialog {...props} class="">
      {children}
    </dialog>
  );
}
