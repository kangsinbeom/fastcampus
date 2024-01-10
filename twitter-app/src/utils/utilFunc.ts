export const currentDate = new Date().toLocaleDateString("ko", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const fileRead = (file: any) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  console.log(file);
  const a = (fileReader.onloadend = (e: any) => {
    const { result } = e.currentTarget;
    return result;
  });
  console.log(a);
  return a;
};

export const truncate = (str: string) => {
  return str.length > 10 ? str.substring(0, 10) + "..." : str;
};
