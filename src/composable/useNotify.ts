import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notify = (
    type: "positive" | "negative" | "warning",
    message: string,
    position:
      | "top-right"
      | "top-left"
      | "bottom-left"
      | "bottom-right"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "center" = "top-right",
  ) => {
    $q.notify({ type, message, position });
  };

  return {
    success: (msg: string) => notify("positive", msg),
    error: (msg: string) => notify("negative", msg),
    warning: (msg: string) => notify("warning", msg),
  };
}
