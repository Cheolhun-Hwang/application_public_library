package com.hooney.kisa_library;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        init();
        initView();
        initEvent();
    }

    private void initEvent() {
        findViewById(R.id.login_commit_btn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                initMain();
            }
        });
    }

    private void initMain() {
        startActivity(new Intent(getApplicationContext(), MainActivity.class));
        finish();
    }

    private void initView() {
    }

    private void init() {
    }
}
