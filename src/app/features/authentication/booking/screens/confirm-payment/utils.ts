export const generateVietQrUrl = (order: { amount: number; id: number }) => {
  const searchParams = new URLSearchParams({
    accountName: 'Dang Thi Thu Duyen',
    amount: `${order.amount}`,
    addInfo: `ONAPP ${order.id}`,
  });

  return `https://api.vietqr.io/image/970422-0855269237-6u3V6Hx.jpg?${searchParams.toString()}`;
};
