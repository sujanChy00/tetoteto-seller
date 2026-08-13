import { useMMKVString } from "react-native-mmkv";

import { languageData } from "@/constants/language";
import { LANGUAGE_KEY } from "@/constants/query-keys";
import { ILanguageCode, ILanguageTexts } from "@/types";
import { storage } from "@/utils/storage";

export const useLanguage = () => {
  const [language, setLanguage] = useMMKVString(LANGUAGE_KEY, storage);

  function t(key: ILanguageTexts, defaultText?: string): string {
    if (languageData) {
      if (language) {
        if (
          languageData[language as ILanguageCode] &&
          languageData[language as ILanguageCode][key]
        ) {
          return (
            languageData[language as ILanguageCode][key] ?? defaultText ?? ""
          );
        }
      } else {
        if (languageData["en_US"] && languageData["en_US"][key]) {
          return languageData["en_US"][key] ?? defaultText ?? "";
        }
      }
    }
    return defaultText ?? "";
  }

  const selectedLanguage = language || "en_US";

  return { language: selectedLanguage, setLanguage, t };
};
