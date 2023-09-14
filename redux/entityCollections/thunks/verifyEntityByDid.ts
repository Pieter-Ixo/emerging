import requestEntityVerifyByDid from "@/requests/requesters/requestEntityVerify";

import type { AppThunk } from "../../store";
import {
  setEntityVerified,
  setEntityVerifiedError,
  setEntityVerifiedLoading,
} from "../slice";

export default function verifyEntityByDid(entityDid: string): AppThunk {
  return async (dispatch) => {
    dispatch(setEntityVerifiedLoading({ isLoading: true }));
    try {
      const verifyResponse = await requestEntityVerifyByDid(entityDid);
      if (verifyResponse)
        dispatch(
          setEntityVerified({
            isVerified: verifyResponse.entity.entity_verified,
          })
        );
    } catch (error) {
      if (error instanceof Error)
        dispatch(
          setEntityVerifiedError({
            error: error.message,
          })
        );
    } finally {
      dispatch(setEntityVerifiedLoading({ isLoading: false }));
    }
  };
}
