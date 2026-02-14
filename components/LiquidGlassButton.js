/**
 * Liquid Glass Button – logo-inspired glossy, refractive CTA.
 * Use for primary actions; supports link or button, sizes, and disabled state.
 */
export default function LiquidGlassButton({
  as: Tag = "button",
  href,
  children,
  className = "",
  size = "md", // 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-lg'
  disabled,
  "aria-disabled": ariaDisabled,
  ...props
}) {
  const sizeClass =
    size === "lg"
      ? "btn-lg"
      : size === "xl"
        ? "btn-xl"
        : size === "icon"
          ? "btn-icon"
          : size === "icon-lg"
            ? "btn-icon btn-lg"
            : "";
  const isDisabled = disabled || ariaDisabled === "true";

  const combined = ["btn-liquid-glass", sizeClass, className]
    .filter(Boolean)
    .join(" ");

  const wrapperClass =
    size === "icon" || size === "icon-lg"
      ? "btn-liquid-glass-wrapper rounded-full"
      : "btn-liquid-glass-wrapper";

  if (Tag === "a") {
    return (
      <span className={wrapperClass}>
        <a
          href={href}
          className={combined}
          aria-disabled={isDisabled ? "true" : undefined}
          {...props}
        >
          {children}
        </a>
      </span>
    );
  }

  return (
    <span className={wrapperClass}>
      <button
        type={props.type ?? "button"}
        disabled={disabled}
        aria-disabled={ariaDisabled}
        className={combined}
        {...props}
      >
        {children}
      </button>
    </span>
  );
}
