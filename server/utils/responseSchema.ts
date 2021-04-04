export function errRes(message: string) {
  return {
    result: "error",
    error: {
      message,
    },
  };
}

export function okRes(data: any = null) {
  return {
    result: "success",
    data: data,
  };
}
