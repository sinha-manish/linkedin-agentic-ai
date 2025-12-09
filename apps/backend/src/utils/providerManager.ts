let currentProvider = process.env.AI_PROVIDER || "gemini";

export const setProvider = (provider: string) => {
  if (!["openai", "gemini"].includes(provider)) {
    throw new Error("Invalid provider. Use 'openai' or 'gemini'.");
  }
  currentProvider = provider;
};

export const getProvider = () => currentProvider;
