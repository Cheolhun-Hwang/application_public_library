package com.hooney.kisa_library;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import java.util.logging.Logger;

public class LoadingActivity extends AppCompatActivity {
    private final String TAG = LoadingActivity.class.getSimpleName();
    private final int LOADING_TIME = 1500;
    private final int PER_TIME = 300;
    private final int LOADING_SUCCESS = 201;
    private final int LOADING_FAIL = 202;
    private Thread loadingThread;


    private Handler handler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(Message msg) {
            switch (msg.what){
                case LOADING_SUCCESS:
                    successLoading();
                    return true;
                case LOADING_FAIL:
                    failLoading();
                    return true;
                default:
                    Log.d(TAG, "msg case fail.");
                    return false;
            }
        }
    });

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);
    }

    private void initThread() {
        loadingThread = initLoadingThread();
    }

    @Override
    protected void onStart() {
        super.onStart();

        initThread();
        loadingThread.start();
    }

    @Override
    protected void onStop() {
        stopThread();
        super.onStop();
    }

    private void stopThread(){
        if(loadingThread != null){
            if(loadingThread.isAlive()){
                loadingThread.interrupt();
            }
            loadingThread = null;
        }
    }

    private Thread initLoadingThread(){
        return new Thread(new Runnable() {
            @Override
            public void run() {
                int count = 0;
                Message msg = handler.obtainMessage();
                try{
                    while(count < (LOADING_TIME/PER_TIME)){
                        Thread.sleep(PER_TIME);
                        count++;
                    }
                    msg.what = LOADING_SUCCESS;
                } catch (InterruptedException e) {
                    msg.what = LOADING_FAIL;
                }finally {
                    handler.sendMessage(msg);
                }
            }
        });
    }

    private void failLoading(){
        Log.d(TAG, "loading failed.");
        Toast.makeText(this, getResources().getString(R.string.loading_failed), Toast.LENGTH_SHORT).show();
    }

    private void successLoading() {
        startActivity(new Intent(getApplicationContext(), LoginActivity.class));
        finish();
    }
}
