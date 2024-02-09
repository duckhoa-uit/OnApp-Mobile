export const generatePaymentQrUrl = (appointmentId: number, amount: number) =>
  `https://api.vietqr.io/image/970436-1014414697-zwqHyEp.jpg?accountName=DANG%20THI%20THU%20DUYEN&amount=${amount}&addInfo=PMONAPP${appointmentId}`;
