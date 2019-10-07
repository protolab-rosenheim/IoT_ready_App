# IoT Ready Kit App

### Mitwirkende
- [Martin Neumayer](https://github.com/orgs/protolab-rosenheim/people/swifmaneum)
- [Josef Baudisch](https://github.com/orgs/protolab-rosenheim/people/joe-baudisch)
- [Michael List](https://github.com/orgs/protolab-rosenheim/people/Michael-List)

### Installieren und ausführen

Eine aktuelle Version von [Node.js](https://nodejs.org/) ist erforderlich.

Ionic und Cordova via npm installieren:

    npm install -g ionic cordova

Dependencies installieren und ausführen:

    cd IoT_ready_App/
    npm install
    ionic serve

### Tests ausführen
Alle Testskripte sind in der package.json scripts-Sektion definiert. Sie können wie folgt ausgeführt werden:

    //Tests kontinuierlich im Hintergrund auswerten
    npm run test

    //Tests einmalig ausführen
    npm run test-ci

    //Tests mit Coverage ausführen (legt einen Ordner coverage mit einem HTML-Report an)
    npm run test-coverage

    //Lint durchführen
    npm run lint


### Für iOS bauen

    ionic cordova build ios

Erzeugt den Ordner /platforms/ios in dem sich ein XCode-Projekt für das Installieren der App auf einem iOS-Gerät befindet.

Für das produktive Build:

    ionic cordova build ios --prod --release --minifyjs --minifycss --optimizejs

### Deployment auf iOS-Gerät

Vorraussetzungen: Mac-System mit installiertem XCode, via USB angeschlossenes Gerät z.B. iPad, entsprechendes Zertifikat

1. Den beim Bauen erstellten /platforms/ios-Ordner auf das Mac-System kopieren
2. Die .xcodeproj-Datei im /platforms/ios-Ordner mit XCode öffnen
3. Zertifikat auswählen
4. Gerät als Build-Target auswählen (z.B. iPad Pro)
5. App ausführen

### Deployment via AppStore

Vorraussetzungen: Mac-System mit installiertem XCode, entsprechendes Zertifikat

1. Den beim Bauen erstellten /platforms/ios-Ordner auf das Mac-System kopieren
2. Die .xcodeproj-Datei im /platforms/ios-Ordner mit XCode öffnen
3. Zertifikat auswählen (falls danach eine Fehlermeldung bezüglich "automatic managed signing" auftritt, diese Checkbox nochmal weg-und anklicken)
4. _Generic iOS device_ als Build-Target auswählen
5. Product -> Archive -> Upload to App Store -> den Anweisungen folgen und ggf. bestätigen -> Upload

#### Behebung von div. Errormeldungen

1."Missing Provisioning Profile :Apps must contain a provisioning profile in a file named embedded.mobileprovision"

Lösung: You can switch out the build system under file > workspace settings (or project settings) and then select Legacy Build System under Build System. 
(https://stackoverflow.com/questions/52426643/missing-provisioning-profile-apps-must-contain-a-provisioning-profile-in-a-file).

2."Invalid App Store Icon. The App Store Icon in the asset catalog in ... can't be transparent nor contain an alpha channel"

Lösung: Copy and Paste the App Store icon to the desktop . Open the image. Click File Menu->Duplicate.
Save it by unticking the Alpha channel.
Replace the current App Store icon with this one.
Validate and upload.(https://stackoverflow.com/questions/46585809/error-itms-90717-invalid-app-store-icon/47264220#47264220).

Dann neue icons mit dem Mustericon(ohne Alpha-Channel) erzeugen mit: 
    
    ionic cordova resources ios 

### Probleme mit App Preferences oder Plugins beheben

Sollten z.B. nach einem Git Clone nicht alle Plugins in das iOS-Build übernommen werden, kann es helfen den `platforms` und den `plugins` Ordner komplett zu löschen und erneut zu bauen:

    rm -r platforms
    rm -r plugins
    ionic cordova build ios 

Nach dem ersten Auschecken oder bei Änderungen an der app-settings.json ist ein `cordova prepare ios` nötig. Achtung: `ionic cordova prepare ios` scheint nicht zu funktionieren. 

Nach einem frischen Checkout kann man auch beides kombinieren:

    rm -r platforms
    rm -r plugins
    ionic cordova build ios
    cordova prepare ios
