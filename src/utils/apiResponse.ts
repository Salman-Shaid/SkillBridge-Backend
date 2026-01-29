export const successResponse = (
  res: any,
  data: any,
  message = "Success"
) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};
