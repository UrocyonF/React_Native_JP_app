import 'react-native-gesture-handler';
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const dico = new Map();
dico.set('a', 'あ');
dico.set('i', 'い');
dico.set('u', 'う');
dico.set('e', 'え');
dico.set('o', 'お');


function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="TradScreen" component={TradScreen} />
                <Stack.Screen name="DicoScreen" component={DicoScreen} />
                <Stack.Screen name="KanaScreen" component={KanaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Dictionnary"
                onPress={() => navigation.navigate('DicoScreen')}
            />
            <Button
                title="Traduction"
                onPress={() => navigation.navigate('TradScreen')}
            />
            <Button
                title="あ Kana ア"
                onPress={() => navigation.navigate('KanaScreen')}
            />
        </View>
    );
}

function TradScreen({ navigation }: { navigation: any }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go home"
                onPress={() => navigation.navigate('HomeScreen')}
            />
        </View>
    );
}

function DicoScreen({ navigation }: { navigation: any }) {
    return (
        <Button
            title="Go home"
            onPress={() => navigation.navigate('HomeScreen')}
        />
    );
}

function KanaScreen({ navigation }: { navigation: any }) {
    return (
        <ScrollView>
            <View style={styles.kanaRow}>
                <View>
                    <Text style={styles.kanaTitle}>Hiragana</Text>

                    <Text style={styles.kana}>       A   I   U   E   O</Text>
                    <Text style={styles.kana}>      あ い う え お</Text>
                    <Text style={styles.kana}>K    か き く け こ</Text>
                    <Text style={styles.kana}>S    さ し す せ そ</Text>
                    <Text style={styles.kana}>T    た ち つ て と</Text>
                    <Text style={styles.kana}>N    な に ぬ ね の</Text>
                    <Text style={styles.kana}>H    は ひ ふ へ ほ</Text>
                    <Text style={styles.kana}>M    ま み む め も</Text>
                    <Text style={styles.kana}>R    ら り る れ ろ</Text>
                    <Text style={styles.kana}>Y    や      ゆ      よ</Text>
                    <Text style={styles.kana}>W    わ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>N    ん</Text>
                    <Text style={styles.kana}>O    を</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.kanaTitle}>Accents</Text>

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
                    <Text style={styles.kanaTitle}>Composition Y</Text>

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
                    <Text style={styles.kanaTitle}>Double consone</Text>

                    <Text style={styles.kana}>KKA      っか</Text>
                    <Text style={styles.kana}>SSA      っさ</Text>
                    <Text style={styles.kana}>TTA      った</Text>
                    <Text style={styles.kana}>PPA      っぱ</Text>
                    <Text></Text>
                    <Text style={styles.kana}>TTSU    っつ</Text>
                    <Text style={styles.kana}>SSHI     っし</Text>
                    <Text style={styles.kana}>CCHI     っち</Text>

                    <View style={styles.kanaSeparator} />
                    <Text style={styles.kanaTitle}>Cas particuliers katakana</Text>

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
                    <Text style={styles.kanaTitle}>Katakana</Text>

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
                    <Text style={styles.kanaTitle}>Accents</Text>

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
                    <Text style={styles.kanaTitle}>Composition Y</Text>

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
                    <Text style={styles.kanaTitle}>Double consone</Text>

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
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
    },
    mainTitle: {
        fontWeight: '800',
        fontSize: 40,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    kanaRow: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    kanaTitle: {
        fontWeight: '800',
        fontSize: 17,
        marginTop: 7,
        marginBottom: 10,
        textAlign: 'center',
    },
    kana: {
        fontWeight: '800',
        fontSize: 26,
    },
    kanaSeparator: {
        height: 1,
        backgroundColor: 'black',
        marginTop: 10,
    }
});

export default App;
