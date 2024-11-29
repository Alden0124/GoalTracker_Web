type AnyFunction = (...args: any[]) => any;

/**
 * 簡易版防抖函數
 * @param func 要執行的函數
 * @param delay 延遲時間（毫秒）
 */
export function debounce<T extends AnyFunction>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    // 如果有待執行的函數，先清除
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 設置新的延遲執行
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
} 