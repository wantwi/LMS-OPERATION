import { useQuery,useMutation } from "react-query";

export const useGet = (key,func,search="",onSuccess, onError) => {

    return useQuery(
        [key,{search}], 
        func,
        {onSuccess, onError})
}

export const useGetById = (key,id="",func,onSuccess, onError) => {

    return useQuery(
        [key,{id}], 
        func,
        {
            enabled:false,

            onSuccess, 
            onError
        })
}

export const useGetStatic = (key,func,onSuccess, onError) => {

    return useQuery(
        
        [key], 
        func,
        {onSuccess,
             onError,
             refetchOnWindowFocus: false

            })
}




 