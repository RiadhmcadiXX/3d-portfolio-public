import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function StudioLoading() {
  return (
    <div className="office-loading" role="status" aria-label="Loading studio">
      <DotLottieReact src="/lost-in-space.lottie" loop autoplay className="office-loading__lottie" />
    </div>
  );
}
