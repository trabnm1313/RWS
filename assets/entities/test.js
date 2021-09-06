import { Image } from 'react-native'

export default function (){
    return {
        renderer: <Image source={require('../image/Knight.png')} style={{ left: 50, top: 50, position: 'absolute', width: 100, height: 100}}></Image>
    }
}