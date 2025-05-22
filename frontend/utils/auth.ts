export const registerUser = async (email: string, password: string, name?: string) => {
    const query = `
    mutation Register($input: RegisterInput!) {
      register(input: $input) {
        success
        user {
          id
          email
          name
        }
      }
    }
  `;

    const variables = {
        input: { email, password, name },
    };

    const res = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query, variables }),
    });

    const data = await res.json();

    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    return data.data.register.user;
};

export const loginUser = async (email: string, password: string) => {
    const query = `
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          user {
            id
            email
            name
          }
        }
      }
    `;

    const variables = {
        input: { email, password },
    };

    const res = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const data = await res.json();

    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    const { user } = data.data.login;

    return user;
};

export const logoutUser = async () => {
    const query = `
    mutation {
      logout
    }
  `;

    const res = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });

    const data = await res.json();

    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    return data.data.logout;
};

export const fetchMe = async () => {
    const query = `
    query {
      me {
        id
        email
        name
      }
    }
  `;

    const res = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });

    const data = await res.json();

    if (data.errors) throw new Error(data.errors[0].message);

    return data.data.me;
};

