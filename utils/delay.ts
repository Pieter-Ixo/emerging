/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const minDelay = async (p: Promise<any>, ms: number) => {
  const [res] = await Promise.all([p, delay(ms)])
  return res
}
