import { throttle } from "@/utils/throttle";
import { useEffect, useMemo } from "react";

interface InfiniteScrollOptions {
  // 是否有下一頁
  hasNextPage: boolean;
  // 是否正在加載
  isFetchingNextPage: boolean;
  // 加載下一頁的函數
  fetchNextPage: () => void;
  // 觸發加載的閾值，默認為 0.5（表示距離底部 50% 時加載）
  threshold?: number;
  // 節流延遲時間（毫秒），默認為 200ms
  throttleDelay?: number;
  // 是否啟用，默認為 true
  enabled?: boolean;
}

/**
 * 無限捲動 Hook
 * @param options 配置選項
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.5,
  throttleDelay = 200,
  enabled = true,
}: InfiniteScrollOptions) => {
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (!hasNextPage || isFetchingNextPage || !enabled) {
          console.log("無法加載更多:", {
            hasNextPage,
            isFetchingNextPage,
            enabled,
          });
          return;
        }

        const {
          scrollTop: windowScrollY,
          scrollHeight: documentHeight,
          clientHeight: windowHeight,
        } = {
          scrollTop: window.scrollY,
          scrollHeight: document.documentElement.scrollHeight,
          clientHeight: window.innerHeight,
        };

        const scrollThreshold = windowHeight * threshold;
        const remainingSpace = documentHeight - windowScrollY - windowHeight;

        console.log("滾動狀態:", {
          remainingSpace,
          threshold: scrollThreshold,
          shouldLoadMore: remainingSpace <= scrollThreshold,
        });

        if (remainingSpace <= scrollThreshold) {
          console.log("觸發加載下一頁");
          fetchNextPage();
        }
      }, throttleDelay),
    [hasNextPage, isFetchingNextPage, fetchNextPage, threshold, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll, enabled]);
};
