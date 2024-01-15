/*
 * Copyright (c) 2023, BALLEUR Maxime
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 * Author: BALLEUR Maxime
 * Date: 2023
 *
 * @format
*/

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';


class KanaScreen extends Component {
    render() {
    return (
        <ScrollView>
            <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
                <View>
                    <Text style={styles.title}>Hiragana</Text>

                    <Text style={styles.kana}>       A   I   U   E   O</Text>
                    <Text style={styles.kana}>      あ い う え お</Text>
                    <Text style={styles.kana}>K    か き く け こ</Text>
                    <Text style={styles.kana}>S    さ し す せ そ</Text>
                    <Text style={styles.kana}>T    た ち つ て と</Text>
                    <Text style={styles.kana}>N    な に ぬ ね の</Text>
                    <Text style={styles.kana}>H    は ひ ふ へ ほ</Text>
                    <Text style={styles.kana}>M   ま み む め も</Text>
                    <Text style={styles.kana}>R    ら り る れ ろ</Text>
                    <Text style={styles.kana}>Y    や      ゆ      よ</Text>
                    <Text style={styles.kana}>W   わ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>N    ん</Text>
                    <Text style={styles.kana}>O    を</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Accents</Text>

                    <Text style={styles.kana}>       A   I   U   E   O</Text>
                    <Text style={styles.kana}>G    が ぎ ぐ げ ご</Text>
                    <Text style={styles.kana}>Z    ざ      ず ぜ ぞ</Text>
                    <Text style={styles.kana}>D    だ           で ど</Text>
                    <Text style={styles.kana}>B    ば び ぶ べ ぼ</Text>
                    <Text style={styles.kana}>P    ぱ ぴ ぷ ぺ ぽ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>J         じ</Text>
                    <Text style={styles.kana}>J         ぢ</Text>
                    <Text style={styles.kana}>Z              づ</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Composition Y</Text>

                    <Text style={styles.kana}>    YA     YU     YO</Text>
                    <Text style={styles.kana}>K きゃ きゅ きょ</Text>
                    <Text style={styles.kana}>G ぎゃ ぎゅ ぎょ</Text>
                    <Text style={styles.kana}>N にゃ にゅ にょ</Text>
                    <Text style={styles.kana}>H ひゃ ひゅ ひょ</Text>
                    <Text style={styles.kana}>B びゃ びゅ びょ</Text>
                    <Text style={styles.kana}>P ぴゃ ぴゅ ぴょ</Text>
                    <Text style={styles.kana}>M みゃ みゅ みょ</Text>
                    <Text style={styles.kana}>R りゃ りゅ りょ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>         A      U       O</Text>
                    <Text style={styles.kana}>SH しゃ しゅ しょ</Text>
                    <Text style={styles.kana}>J    じゃ じゅ じょ</Text>
                    <Text style={styles.kana}>CH ちゃ ちゅ ちょ</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Double consone</Text>

                    <Text style={styles.kana}>KKA      っか</Text>
                    <Text style={styles.kana}>SSA      っさ</Text>
                    <Text style={styles.kana}>TTA      った</Text>
                    <Text style={styles.kana}>PPA      っぱ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>TTSU    っつ</Text>
                    <Text style={styles.kana}>SSHI     っし</Text>
                    <Text style={styles.kana}>CCHI     っち</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Cas particuliers katakana</Text>

                    <Text style={styles.kana}>        A        I        U</Text>
                    <Text style={styles.kana}>W            ウィ</Text>
                    <Text style={styles.kana}>SH</Text>
                    <Text style={styles.kana}>CH</Text>
                    <Text style={styles.kana}>TS  ツァ</Text>
                    <Text style={styles.kana}>T             ティ トゥ</Text>
                    <Text style={styles.kana}>F    ファ フィ</Text>
                    <Text style={styles.kana}>J</Text>
                    <Text style={styles.kana}>D             ディ ドゥ</Text>
                    <Text style={styles.kana}>DY                   デゥ</Text>
                </View>

                <View>
                    <Text style={styles.title}>Katakana</Text>

                    <Text style={styles.kana}>      A   I   U   E   O</Text>
                    <Text style={styles.kana}>     ア イ ウ エ オ</Text>
                    <Text style={styles.kana}>     カ キ ク ケ コ</Text>
                    <Text style={styles.kana}>     サ シ ス セ ソ</Text>
                    <Text style={styles.kana}>     タ チ ツ テ ト</Text>
                    <Text style={styles.kana}>     ナ ニ ヌ ネ ノ</Text>
                    <Text style={styles.kana}>     ハ ヒ フ ヘ ホ</Text>
                    <Text style={styles.kana}>     マ ミ ム メ モ</Text>
                    <Text style={styles.kana}>     ラ リ ル レ ロ</Text>
                    <Text style={styles.kana}>     ヤ      ユ      ヨ</Text>
                    <Text style={styles.kana}>     ワ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>     ン</Text>
                    <Text style={styles.kana}>     ヲ</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Accents</Text>

                    <Text style={styles.kana}>      A   I   U   E   O</Text>
                    <Text style={styles.kana}>     ガ ギ グ ゲ ゴ</Text>
                    <Text style={styles.kana}>     ザ      ズ ゼ ゾ</Text>
                    <Text style={styles.kana}>     ダ           デ ド</Text>
                    <Text style={styles.kana}>     バ ビ ブ ベ ボ</Text>
                    <Text style={styles.kana}>     パ ピ プ ペ ポ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>          ジ</Text>
                    <Text style={styles.kana}>          ヂ</Text>
                    <Text style={styles.kana}>               ヅ</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Composition Y</Text>

                    <Text style={styles.kana}>     YA     YU     YO</Text>
                    <Text style={styles.kana}>    キャ キュ キョ</Text>
                    <Text style={styles.kana}>    ギャ ギュ ギョ</Text>
                    <Text style={styles.kana}>    ニャ ニュ ニョ</Text>
                    <Text style={styles.kana}>    ヒャ ヒュ ヒョ</Text>
                    <Text style={styles.kana}>    ビャ ビュ ビョ</Text>
                    <Text style={styles.kana}>    ピャ ピュ ピョ</Text>
                    <Text style={styles.kana}>    ミャ ミュ ミョ</Text>
                    <Text style={styles.kana}>    リャ リュ リョ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>       A      U       O</Text>
                    <Text style={styles.kana}>    シャ シュ ショ</Text>
                    <Text style={styles.kana}>    ジャ ジュ ジョ</Text>
                    <Text style={styles.kana}>    チャ チュ チョ</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.title}>Double consone</Text>

                    <Text style={styles.kana}>           ッカ</Text>
                    <Text style={styles.kana}>           ッサ</Text>
                    <Text style={styles.kana}>           ッタ</Text>
                    <Text style={styles.kana}>           ッパ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>           ッツ</Text>
                    <Text style={styles.kana}>           ッシ</Text>
                    <Text style={styles.kana}>           ッチ</Text>

                    <View style={styles.kanaSeparator} />
                    <Text></Text><Text></Text>

                    <Text style={styles.kana}>      E        O</Text>
                    <Text style={styles.kana}>   ウェ  ウォ</Text>
                    <Text style={styles.kana}>   シェ</Text>
                    <Text style={styles.kana}>   チェ</Text>
                    <Text style={styles.kana}>   ツェ  ツォ</Text>
                    <Text></Text><Text></Text>
                    <Text style={styles.kana}>   フェ  フォ</Text>
                    <Text style={styles.kana}>   ジェ</Text>
                </View>
            </LinearGradient>
        </ScrollView>
    )};
}


const styles = StyleSheet.create({
    view: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    title: {
        fontSize: 17,
        marginTop: 7,
        marginBottom: 10,
        textAlign: 'center',
        color: 'thistle'
    },

    kana: {
        fontWeight: '800',
        fontSize: 22,
        color: 'white'
    },
    kanaSeparator: {
        height: 1,
        backgroundColor: 'white',
        marginTop: 10
    }
});


export default KanaScreen;