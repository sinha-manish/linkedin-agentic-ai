import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LinkedIn Agentic AI API",
      version: "1.0.0",
      description: "API documentation for LinkedIn Agentic AI system (Agents, Feed, Digests, Settings, Embeddings & More)",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server"
      }
    ]
  },

  // All route files
  apis: [
    "./src/routes/*.ts",
    "./src/routes/**/*.ts",
    "./src/agents/*.ts",
    "./src/workflows/*.ts"
  ],
});
