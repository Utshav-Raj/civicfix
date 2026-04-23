import { CommunityFeedPage } from "@/components/feed/feed-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CommunityFeedPage />
    </Suspense>
  );
}
