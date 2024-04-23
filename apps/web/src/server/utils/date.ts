export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined,
) => {
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date();
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000,
  );
  return Math.floor(trialEnd.getTime() / 1000);
};
