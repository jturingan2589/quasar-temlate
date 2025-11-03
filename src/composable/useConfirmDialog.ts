import { useQuasar } from "quasar";

/**
 * A reusable confirmation dialog composable.
 *
 * Usage:
 * const { confirmAction } = useConfirmDialog();
 * await confirmAction("Deactivate User", "Deactivate user 'john'?");
 */
export function useConfirmDialog() {
  const $q = useQuasar();

  /**
   * Opens a confirmation dialog with custom title and message.
   * Returns a Promise<boolean> — resolves true if confirmed.
   */
  function confirmAction(
    title: string,
    message: string,
    options: {
      okLabel?: string;
      cancelLabel?: string;
      okColor?: string;
      cancelColor?: string;
    } = {},
  ): Promise<boolean> {
    const {
      okLabel = "Yes",
      cancelLabel = "Cancel",
      okColor = "primary",
      cancelColor = "grey",
    } = options;

    return new Promise((resolve) => {
      $q.dialog({
        title,
        message,
        cancel: {
          label: cancelLabel,
          color: cancelColor,
          flat: true,
        },
        ok: {
          label: okLabel,
          color: okColor,
          flat: false,
          nocaps: false,
        },
        persistent: true,
      })
        .onOk(() => resolve(true))
        .onCancel(() => resolve(false))
        .onDismiss(() => resolve(false));
    });
  }

  return { confirmAction };
}
