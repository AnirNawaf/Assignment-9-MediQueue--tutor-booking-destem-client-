export const getUsers  = async() =>{
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/UserModel');
    const data = await res.json();
    return data;
}