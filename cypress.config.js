import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://fila-de-espera-app.dev.tcero.tc.br:8888",
    // Não irá limpar o estado da tela após cada it 
    testIsolation: false,
  },
});
