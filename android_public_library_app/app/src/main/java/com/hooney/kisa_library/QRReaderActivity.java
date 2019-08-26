package com.hooney.kisa_library;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class QRReaderActivity extends AppCompatActivity {
    private final String TAG = QRReaderActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qrreader);

        init();
        initView();
        initEvent();
    }

    private void initEvent() {
    }

    private void initView() {
    }

    private void init() {
        initQR();
    }

    private void initQR() {
        IntentIntegrator intentIntegrator = new IntentIntegrator(this);
        intentIntegrator.setBeepEnabled(false);//바코드 인식시 소리
        intentIntegrator.initiateScan();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if(result != null) {
            if(result.getContents() == null) {
                intentFinish(RESULT_CANCELED);
            } else {
                intentFinish(RESULT_OK, result.getContents());
            }
            return;
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    private void intentFinish(int resultOk, String contents) {
        Intent data = new Intent();
        data.putExtra("qr_result", contents);
        setResult(resultOk, data);
        finish();
    }

    private void intentFinish(int resultCanceled) {
        setResult(resultCanceled);
        finish();
    }
}
