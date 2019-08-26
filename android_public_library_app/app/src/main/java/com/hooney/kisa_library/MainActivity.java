package com.hooney.kisa_library;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.hooney.kisa_library.utils.Secrets;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

public class MainActivity extends AppCompatActivity {
    private final String TAG = MainActivity.class.getSimpleName();
    private final int SIG_QR_RESULT = 401;

    private TextView resultText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
        initView();
        initEvent();
    }

    private void initEvent() {
        findViewById(R.id.scan_qr_img_btn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivityForResult(new Intent(getApplicationContext(), QRReaderActivity.class),
                        SIG_QR_RESULT);
            }
        });
    }

    private void initView() {
        resultText = findViewById(R.id.scan_result_text);
    }

    private void init() {

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if(requestCode == SIG_QR_RESULT){
            if(resultCode == RESULT_OK){
                String result_text = data.getStringExtra("qr_result");
                if(result_text != null){
                    String res = "";
                    res += (result_text + "\n");
                    try {
                        result_text = result_text.replaceAll("key=", "")
                                .replaceAll("\"", "");
                        String code = Secrets.getInstance(getApplicationContext()).encode(result_text);
                        res+= (code + "\n");

                        String decode = Secrets.getInstance(getApplicationContext()).decode(code);
                        res+= (decode + "\n");
                    } catch (UnsupportedEncodingException | NoSuchPaddingException |
                            NoSuchAlgorithmException | InvalidAlgorithmParameterException |
                            InvalidKeyException | BadPaddingException |
                            IllegalBlockSizeException e) {
                        Log.e(TAG, "error crypto.");
                    }

                    resultText.setText(res);
                }else{
                    resultText.setText(getResources().getString(R.string.qr_result_error));
                }
            }else{
                resultText.setText(getResources().getString(R.string.qr_result_error));
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
