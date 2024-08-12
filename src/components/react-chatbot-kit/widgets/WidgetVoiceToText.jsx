const WidgetVoiceToText = (props) => {
    console.log('widget',transcript)

    const transcript = props.payload?.transcript || [];
    console.log('widget',transcript)
    // if (transcript !== null && transcript !== '')
    //     props.actionProvider.handleMessage(transcript)
    }

export default WidgetVoiceToText;
