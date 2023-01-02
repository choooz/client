import axios from "axios";
import { SERVER_URL } from "lib/constants";

export type CodeType = string | string[];

interface KakaoLoginRequest {
  code: CodeType;
  redirectUrl: string;
}

interface NaverLoginRequest {
  code: CodeType;
  state: string;
}

export const kakaoLoginAPI = async (loginRequest: KakaoLoginRequest) => {
  const response = await axios.post(`${SERVER_URL}api/oauth/kakao`, loginRequest);
  return response.data;
};

export const naverLoginAPI = async (loginRequest: NaverLoginRequest) => {
  const response = await axios.post(`${SERVER_URL}api/oauth/naver`, loginRequest);
  return response.data;
};
