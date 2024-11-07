const BASE_URL = "https://fakestoreapi.com";

// Login API call
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Register API call
export const registerUser = async (username, password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
      throw new Error("Registration failed!");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
