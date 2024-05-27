const getAuthHeader = () => {
  return { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
}

export { getAuthHeader };
