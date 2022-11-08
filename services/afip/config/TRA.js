import forge from 'node-forge';

export function  createCms(pem, key, TRA){
    try {
        
        var p7 = forge.pkcs7.createSignedData();
        p7.content = forge.util.createBuffer(TRA, 'utf8');
        p7.addCertificate(pem);
        p7.addSigner({
            key: key,
            certificate: pem,
        });
        p7.sign();
        let cms = forge.pkcs7.messageToPem(p7).replace("-----BEGIN PKCS7-----","").replace("-----END PKCS7-----","");
    
        return cms
    } catch (error) {
        
        return (error)
    }
   
}