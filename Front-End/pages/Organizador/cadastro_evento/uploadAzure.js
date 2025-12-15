export async function uploadImageToAzure(uploadParams) {
console.log(uploadParams)
    const {storageAccount, containerName, file,sasToken} = uploadParams
    const fileName = `${Date.now()}-${file.name}`


    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${fileName}`

        const uploadUrl = `${baseUrl}?${sasToken}`

        const options ={
            method:'PUT',
            headers:{
                'x-ms-blob-type':'BlockBlob',
                'Content-Type': 'application/octet-stream'
            },
            body:file
        }
        const response = await fetch(uploadUrl,options)
        if(response.ok){
            return baseUrl
        }
        else{
            return response.ok
        }
}

