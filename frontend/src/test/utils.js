/**
 * Test Utilities
 * Helper functions for testing
 */

import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Custom render function with providers
 * Includes React Query and other necessary providers
 */
export const renderWithProviders = (
  component,
  { queryClient = new QueryClient(), ...renderOptions } = {},
) => {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
};

/**
 * Mock axios responses
 */
export const mockAxiosResponse = (data, status = 200) => ({
  status,
  data,
  headers: {},
  config: {},
});

export const mockAxiosError = (message = "Error", status = 500) => ({
  response: {
    status,
    data: { message },
  },
  message,
});

/**
 * Wait for async operations
 */
export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));
