export const getUsers  = async() =>{
    const res = await fetch('http://localhost:5000/UserModel');
    const data = await res.json();
    return data;
}