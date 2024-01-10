import { languageState } from "atom";
import TRANSLATIONS from "constant/language";
import { useRecoilValue } from "recoil";

const useTranslation = () => {
  const lang = useRecoilValue(languageState);
  return (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][lang];
};

export default useTranslation;
