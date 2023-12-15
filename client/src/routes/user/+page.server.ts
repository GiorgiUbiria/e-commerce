import {redirect} from "@sveltejs/kit";

export async function load({ cookies }: any) {
   if(!cookies.get("Authorization") || !cookies.get("RefreshToken")) {
       redirect(303, "/sign-in");
   }

   const userId = cookies.get("userId");
   
   try {
       const response = await fetch(`http://localhost:3000/user/${userId}`, {
           method: "GET",
           credentials: "include",
           headers: {
               "Authorization": `${cookies.get('Authorization')}`,
               "RefreshToken": `${cookies.get('RefreshToken')}`
           }
       });

       const data = await response.json();

       return data;
   } catch (error) {
       console.log(error)
   }
}
