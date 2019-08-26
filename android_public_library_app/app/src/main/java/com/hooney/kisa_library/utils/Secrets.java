package com.hooney.kisa_library.utils;

import android.content.Context;
import android.util.Base64;
import android.util.Log;

import com.hooney.kisa_library.R;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Secrets {
    private static Secrets instance;
    private String project_key;
    public Secrets(){
    }
    public void setProjectKey(String key){
        this.project_key = key;
    }
    public static Secrets getInstance(Context context){
        if(instance == null){
            instance = new Secrets();
            instance.setProjectKey(context.getResources().getString(R.string.project_key));
        }
        return instance;
    }

    public String encode(String str)
            throws UnsupportedEncodingException, NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException,
            IllegalBlockSizeException {
        int loop = ((str.length()/16)) + ((str.length()%16)!=0?1:0);
        String res = "";
        for(int index = 0 ; index < loop ; index++){
            String sub_res = "";
            if(str.length() > (index+1) * 16){
                sub_res = str.substring(index*16, (index+1)*16);
            }else{
                sub_res = str.substring(index*16);
            }
            byte[] textBytes = sub_res.getBytes("UTF-8");
            byte[] ivBytes = new byte[16];
            AlgorithmParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            SecretKeySpec newKey = new SecretKeySpec(
                    project_key.getBytes("UTF-8"), "AES-256");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, newKey, ivSpec);
            res += Base64.encodeToString(cipher.doFinal(textBytes), 0);
            Log.d("encode", "length : " + res.length());
        }
        return res;
    }

    public String decode(String code)
            throws UnsupportedEncodingException, NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException,
            IllegalBlockSizeException {
        int loop = ((code.length()/45)) + ((code.length()%45)!=0?1:0);
        String res = "";
        for(int index = 0 ; index < loop ; index++){
            String sub_res = "";
            if(code.length() >  (index+1) * 45){
                sub_res = code.substring(index*45, (index+1)*45);
            }else{
                sub_res = code.substring(index*45);
            }
            byte[] textBytes = Base64.decode(sub_res, 0);
            byte[] ivBytes = new byte[16];
            AlgorithmParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            SecretKeySpec newKey = new SecretKeySpec(
                    project_key.getBytes("UTF-8"), "AES-256");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, newKey, ivSpec);
            res += new String(cipher.doFinal(textBytes), "UTF-8");
        }
        return res;
    }
}
