# Guida al Deploy senza Terminale

Poiché non puoi usare il terminale, segui questi passaggi per mettere online il sito usando solo il browser.

## 1. Caricamento su GitHub (Web)
1. Vai su [GitHub.com](https://github.com) e fai login.
2. Clicca sul **+** in alto a destra e seleziona **New repository**.
3. Dai un nome al repository (es. `caf-palmas`) e clicca **Create repository**.
4. Nella schermata successiva, clicca sul link **"uploading an existing file"**.
5. Apri la cartella del tuo progetto sul tuo computer.
6. Seleziona **tutti i file e le cartelle** e trascinali dentro l'area di upload di GitHub.
7. Aspetta il caricamento e clicca **Commit changes**.

## 2. Deploy su Google Cloud Run
1. Vai su [Google Cloud Console](https://console.cloud.google.com).
2. Cerca **Cloud Run** e clicca **Crea Servizio**.
3. Seleziona **"Distribuisci continuamente da un repository"**.
4. Clicca **Configura Cloud Build**:
   - Seleziona **GitHub** come provider.
   - Seleziona il repository `caf-palmas` appena creato.
   - Clicca **Avanti**.
5. **Impostazioni di Build**:
   - Tipo di build: **Dockerfile**.
   - Posizione: `/Dockerfile` (lascia default).
6. **Variabili d'ambiente (Fondamentale)**:
   - Apri la sezione "Impostazioni avanzate" o cerca la configurazione del **Trigger di Build**.
   - Per far funzionare l'AI, devi impostare la variabile durante la build.
   - In Cloud Run, vai su **Variabili e Segreti** e aggiungi:
     - Nome: `VITE_API_KEY`
     - Valore: `La-Tua-Chiave-Gemini-Qui`
7. Clicca **Crea**.

Google costruirà il sito (ci vorranno circa 2-3 minuti) e ti fornirà un link pubblico (URL) dove il sito sarà visibile a tutti.