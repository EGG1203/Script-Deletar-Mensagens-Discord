// Cole este código dentro do console em discord.com(navegador)
// Codado por É GG#1203 (714143339368415294)
// Github: https://github.com/EGG1203

(function () {
    let stop;
    let popup;
    popup = window.open('', '', `top=0,left=${screen.width-800},width=850,height=${screen.height}`);
    if(!popup || !popup.document || !popup.document.write) return console.error('Pop-up bloqueado! Por favor, permita pop-ups e tente novamente.');
    popup.document.write(/*html*/`<!DOCTYPE html>
    <html><head><meta charset='utf-8'><title>Apagar Mensagens do Discord por É GG#1203</title><base target="_blank">
    <style>body{background-color:#36393f;color:#dcddde;font-family:sans-serif;font-size: 9pt;} a{color:#00b0f4;}
    body.redact .priv{display:none;} body:not(.redact) .mask{display:none;} body.redact [priv]{-webkit-text-security:disc;}
    .toolbar span{margin-right:8px;}
    button,.btn{color:#fff;background:#7289da;border:0;border-radius:4px;font-size:14px;} button:disabled{display:none;}
    input[type="text"],input[type="search"],input[type="password"],input[type="datetime-local"]{background-color:#202225;color:#b9bbbe;border-radius:4px;border:0;padding:0 .5em;height:24px;width:144px;margin:2px;}
    input#file{display: none}hr{border-color:rgba(255,255,255,0.1);}
    </style></head><body>
    <div class="toolbar" style="position:fixed;top:0;left:0;right:0;padding:8px;background:#36393f;box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 1.5px 0 rgba(0,0,0,.05), 0 2px 0 rgba(0,0,0,.05);">
        <div style="display:flex;flex-wrap:wrap;">
            <span>Token <a href="https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG" title="Ajuda">?</a> <button id="getToken">auto</button><br>
                <input type="password" id="authToken" placeholder="Seu Token" autofocus>*<br>
                <span>Seu ID <a href="https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG" title="Ajuda">?</a> <button id="getAuthor">auto</button></span>
                <br><input id="authorId" type="text" placeholder="Seu ID" priv></span>
            <span>Servidor/Canal <a href="https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG" title="Ajuda">?</a>
                <button id="getGuildAndChannel">auto</button><br>
                <input id="guildId" type="text" placeholder="ID do Servidor" priv><br>
                <input id="channelId" type="text" placeholder="ID do Canal" priv><br>
                <label><input id="includeNsfw" type="checkbox">Canal NSFW</label><br><br>
                <label for="file"  title="Import list of channels from messages/index.json file"> Importar: <span class="btn">...</span> <input id="file" type="file" accept="application/json,.json"></label>
            </span><br>
            <span>Tempo <a href="https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG" title="Ajuda">?</a><br>
                <input id="minDate" type="datetime-local" title="After" style="width:auto;"><br>
                <input id="maxDate" type="datetime-local" title="Before" style="width:auto;"><br>
                <input id="minId" type="text" placeholder="Após mensagem com ID" priv><br>
                <input id="maxId" type="text" placeholder="Antes da mensagem com ID" priv><br>
            </span>
            <span>Pesquisar mensagens <a href="https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG" title="Ajuda">?</a><br>
                <input id="content" type="text" placeholder="Contendo texto" priv><br>
                <label><input id="hasLink" type="checkbox">contendo: link</label><br>
                <label><input id="hasFile" type="checkbox">contendo: arquivos</label><br>
                <label><input id="includePinned" type="checkbox">Incluir fixados</label>
            </span>
        </div>
        <hr>
        <button id="start" style="background:#43b581;width:80px;">Começar</button>
        <button id="stop" style="background:#f04747;width:80px;" disabled>Parar</button>
        <button id="clear" style="width:80px;">Limpar log</button>
        <label><input id="autoScroll" type="checkbox" checked>Auto rolagem</label>
        <label title="Hide sensitive information for taking screenshots"><input id="redact" type="checkbox">Modo de captura de tela</label>
        <progress id="progress" style="display:none;"></progress>

    </div>
    <pre style="margin-top:250px;text-decoration:none;font-size:0.75rem;font-family:Consolas,Liberation Mono,Menlo,Courier,monospace;">
       \n\n
            <a href="https://discord.gg/sgZAMyM3st" target="_blank">Problemas ou ajuda falar com É GG#1203</a></center>
        </pre></body></html>`);

    const $ = s => popup.document.querySelector(s);
    const logArea = $('pre');
    const startBtn = $('button#start');
    const stopBtn = $('button#stop');
    const autoScroll = $('#autoScroll');
    startBtn.onclick = async e => {
        const authToken = $('input#authToken').value.trim();
        const authorId = $('input#authorId').value.trim();
        const guildId = $('input#guildId').value.trim();
        const channelIds = $('input#channelId').value.trim().split(/\s*,\s*/);
        const minId = $('input#minId').value.trim();
        const maxId = $('input#maxId').value.trim();
        const minDate = $('input#minDate').value.trim();
        const maxDate = $('input#maxDate').value.trim();
        const content = $('input#content').value.trim();
        const hasLink = $('input#hasLink').checked;
        const hasFile = $('input#hasFile').checked;
        const includeNsfw = $('input#includeNsfw').checked;
        const includePinned = $('input#includePinned').checked;
        const progress = $('#progress');

        const fileSelection = $("input#file");
        fileSelection.addEventListener("change", () => {
            const files = fileSelection.files;
            const channelIdField = $('input#channelId');
            if (files.length > 0) {
                const file = files[0];
                file.text().then(text => {
                    let json = JSON.parse(text);
                    let channels = Object.keys(json);
                    channelIdField.value = channels.join(",");
                });
            }
        }, false);

        const stopHndl = () => !(stop === true || popup.closed);

        const onProg = (value, max) => {
            progress.setAttribute('max', max);
            progress.value = value;
            progress.style.display = max ? '' : 'none';
        };


        stop = stopBtn.disabled = !(startBtn.disabled = true);
        for (let i = 0; i < channelIds.length; i++) {
            await deleteMessages(authToken, authorId, guildId, channelIds[i], minId || minDate, maxId || maxDate, content, hasLink, hasFile, includeNsfw, includePinned, logger, stopHndl, onProg);
            stop = stopBtn.disabled = !(startBtn.disabled = false);
        }
    };
    stopBtn.onclick = e => stop = stopBtn.disabled = !(startBtn.disabled = false);
    $('button#clear').onclick = e => { logArea.innerHTML = ''; };
    $('button#getToken').onclick = e => {
        window.dispatchEvent(new Event('beforeunload'));
        $('input#authToken').value = JSON.parse(popup.localStorage.token);
    };
    $('button#getAuthor').onclick = e => {
        $('input#authorId').value = JSON.parse(popup.localStorage.user_id_cache);
    };
    $('button#getGuildAndChannel').onclick = e => {
        const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
        $('input#guildId').value = m[1];
        $('input#channelId').value = m[2];
    };
    $('#redact').onchange = e => {
        popup.document.body.classList.toggle('redact') &&
        popup.alert('Isso tentará ocultar informações pessoais, mas certifique-se de verificar antes de compartilhar as capturas de tela.');
    };

    const logger = (type='', args) => {
        const style = { '': '', info: 'color:#00b0f4;', verb: 'color:#72767d;', warn: 'color:#faa61a;', error: 'color:#f04747;', success: 'color:#43b581;' }[type];
        logArea.insertAdjacentHTML('beforeend', `<div style="${style}">${Array.from(args).map(o => typeof o === 'object' ?  JSON.stringify(o, o instanceof Error && Object.getOwnPropertyNames(o)) : o).join('\t')}</div>`);
        if (autoScroll.checked) logArea.querySelector('div:last-child').scrollIntoView(false);
    };

    return 'Funcionou! 👍 Aperte em `auto` para preencher os dados automaticamente!';
    /**
     * Delete todas as mensagens em um canal no Discord ou DM
     * @param {string} authToken 
     * @param {string} authorId 
     * @param {string} guildId 
     * @param {string} channelId 
     * @param {string} minId 
     * @param {string} maxId 
     * @param {string} content 
     * @param {boolean} hasLink 
     * @param {boolean} hasFile 
     * @param {boolean} includeNsfw 
     * @param {function(string, Array)} extLogger 
     * @param {function} stopHndl 
     * @author Guilherme Bastos <https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG>
     * @see https://api.whatsapp.com/send?phone=5561985305544&text=Ol%C3%A1%20GG
     */
    async function deleteMessages(authToken, authorId, guildId, channelId, minId, maxId, content,hasLink, hasFile, includeNsfw, includePinned, extLogger, stopHndl, onProgress) {
        const start = new Date();
        let deleteDelay = 100;
        let searchDelay = 100;
        let delCount = 0;
        let failCount = 0;
        let avgPing;
        let lastPing;
        let grandTotal;
        let throttledCount = 0;
        let throttledTotalTime = 0;
        let offset = 0;
        let iterations = -1;
       
        const wait = async ms => new Promise(done => setTimeout(done, ms));
        const msToHMS = s => `${s / 3.6e6 | 0}h ${(s % 3.6e6) / 6e4 | 0}m ${(s % 6e4) / 1000 | 0}s`;
        const escapeHTML = html => html.replace(/[&<"']/g, m => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\'': '&#039;' })[m]);
        const redact = str => `<span class="priv">${escapeHTML(str)}</span><span class="mask">REDACTED</span>`;
        const queryString = params => params.filter(p => p[1] !== undefined).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
        const ask = async msg => new Promise(resolve => setTimeout(() => resolve(popup.confirm(msg)), 10));
        const printDelayStats = () => log.verb(`Atraso de exclusão: ${deleteDelay}ms, Atraso de procura: ${searchDelay}ms`, `Último Ping: ${lastPing}ms, Ping médio: ${avgPing|0}ms`);
        const toSnowflake = (date) => /:/.test(date) ? ((new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)) : date;
            
        const log = {
            debug() { extLogger ? extLogger('debug', arguments) : console.debug.apply(console, arguments); },
            info() { extLogger ? extLogger('info', arguments) : console.info.apply(console, arguments); },
            verb() { extLogger ? extLogger('verb', arguments) : console.log.apply(console, arguments); },
            warn() { extLogger ? extLogger('warn', arguments) : console.warn.apply(console, arguments); },
            error() { extLogger ? extLogger('error', arguments) : console.error.apply(console, arguments); },
            success() { extLogger ? extLogger('success', arguments) : console.info.apply(console, arguments); },
        };

        async function recurse() {
            let API_SEARCH_URL;
            if (guildId === '@me') {
                API_SEARCH_URL = `https://discord.com/api/v6/channels/${channelId}/messages/`; // DM
            }
            else {
                API_SEARCH_URL = `https://discord.com/api/v6/guilds/${guildId}/messages/`; // Servidor
            }

            const headers = {
                'Authorization': authToken
            };
            
            let resp;
            try {
                const s = Date.now();
                resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
                    [ 'author_id', authorId || undefined ],
                    [ 'channel_id', (guildId !== '@me' ? channelId : undefined) || undefined ],
                    [ 'min_id', minId ? toSnowflake(minId) : undefined ],
                    [ 'max_id', maxId ? toSnowflake(maxId) : undefined ],
                    [ 'sort_by', 'timestamp' ],
                    [ 'sort_order', 'desc' ],
                    [ 'offset', offset ],
                    [ 'has', hasLink ? 'link' : undefined ],
                    [ 'has', hasFile ? 'file' : undefined ],
                    [ 'content', content || undefined ],
                    [ 'include_nsfw', includeNsfw ? true : undefined ],
                ]), { headers });
                lastPing = (Date.now() - s);
                avgPing = avgPing>0 ? (avgPing*0.9) + (lastPing*0.1) : lastPing;
            } catch (err) {
                return log.error('A solicitação de pesquisa gerou um erro:', err);
            }
    
            // ainda nao indexado
            if (resp.status === 202) {
                const w = (await resp.json()).retry_after;
                throttledCount++;
                throttledTotalTime += w;
                log.warn(`Este canal não foi indexado, esperando ${w}ms para o discord indexá-lo...`);
                await wait(w);
                return await recurse();
            }
    
            if (!resp.ok) {
                // procurando mensagens muito rápido
                if (resp.status === 429) {
                    const w = (await resp.json()).retry_after;
                    throttledCount++;
                    throttledTotalTime += w;
                    searchDelay += w; // aumentar o atraso
                    log.warn(`Alterando a taxa limitada pela API para ${w}ms! Aumento do atraso da pesquisa...`);
                    printDelayStats();
                    log.verb(`Respirando por ${w * 2}ms antes de tentar novamente...`);
                    
                    await wait(w*2);
                    return await recurse();
                } else {
                    return log.error(`Erro ao pesquisar mensagens, API respondeu com status ${resp.status}!\n`, await resp.json());
                }
            }
    
            const data = await resp.json();
            const total = data.total_results;
            if (!grandTotal) grandTotal = total;
            const discoveredMessages = data.messages.map(convo => convo.find(message => message.hit===true));
            const messagesToDelete = discoveredMessages.filter(msg => {
                return msg.type === 0 || msg.type === 6 || (msg.pinned && includePinned);
            });
            const skippedMessages = discoveredMessages.filter(msg=>!messagesToDelete.find(m=> m.id===msg.id));

            const end = () => {
                log.success(`Terminou em ${new Date().toLocaleString()}! Tempo total: ${msToHMS(Date.now() - start.getTime())}`);
                printDelayStats();
                log.verb(`Taxa limitada: ${throttledCount} vezes. Tempo total reprimido: ${msToHMS(throttledTotalTime)}.`);
                log.debug(`${delCount} mensagens deletadas, ${failCount} falhas.\n`);
            }

            const etr = msToHMS((searchDelay * Math.round(total / 25)) + ((deleteDelay + avgPing) * total));
            log.info(`Total de mensagens encontradas: ${data.total_results}`, `(Mensagens na página atual: ${data.messages.length}, Para ser deletado: ${messagesToDelete.length}, Sistema: ${skippedMessages.length})`, `Deslocamento: ${offset}`);
            printDelayStats();
            log.verb(`Tempo estimado restante: ${etr}`)
            
            
            if (messagesToDelete.length > 0) {

                if (++iterations < 1) {
                    log.verb(`Esperando pela sua confirmação...`);
                    if (!await ask(`Você quer deletar ~${total} mensagens?\nTempo estimado: ${etr}\n\n---- Visualização ----\n` +
                        messagesToDelete.map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`).join('\n')))
                            return end(log.error('Operação abortada por você!'));
                    log.verb(`OK`);
                }
                
                for (let i = 0; i < messagesToDelete.length; i++) {
                    const message = messagesToDelete[i];
                    if (stopHndl && stopHndl()===false) return end(log.error('Parado por você!'));

                    log.debug(`${((delCount + 1) / grandTotal * 100).toFixed(2)}% (${delCount + 1}/${grandTotal})`,
                        `Excluindo mensagem com ID:${redact(message.id)} <b>de ${redact(message.author.username+'#'+message.author.discriminator)} <small>(${redact(new Date(message.timestamp).toLocaleString())})</small>:</b> <i>${redact(message.content).replace(/\n/g,'↵')}</i>`,
                        message.attachments.length ? redact(JSON.stringify(message.attachments)) : '');
                    if (onProgress) onProgress(delCount + 1, grandTotal);
                    
                    let resp;
                    try {
                        const s = Date.now();
                        const API_DELETE_URL = `https://discord.com/api/v6/channels/${message.channel_id}/messages/${message.id}`;
                        resp = await fetch(API_DELETE_URL, {
                            headers,
                            method: 'DELETE'
                        });
                        lastPing = (Date.now() - s);
                        avgPing = (avgPing*0.9) + (lastPing*0.1);
                        delCount++;
                    } catch (err) {
                        log.error('A solicitação de exclusão gerou um erro:', err);
                        log.verb('Objeto relacionado:', redact(JSON.stringify(message)));
                        failCount++;
                    }

                    if (!resp.ok) {
                        // apagando mensagens muito rápido
                        if (resp.status === 429) {
                            const w = (await resp.json()).retry_after;
                            throttledCount++;
                            throttledTotalTime += w;
                            deleteDelay = w; // aumentar o atraso
                            log.warn(`Sendo a taxa limitada pela API para ${w}ms! Atraso de exclusão ajustado para ${deleteDelay}ms.`);
                            printDelayStats();
                            log.verb(`Respirando por ${w*2}ms antes de tentar novamente...`);
                            await wait(w*2);
                            i--; // tentar novamente
                        } else {
                            log.error(`Erro ao excluir mensagem, API respondeu com status ${resp.status}!`, await resp.json());
                            log.verb('Objeto relacionado:', redact(JSON.stringify(message)));
                            failCount++;
                        }
                    }
                    
                    await wait(deleteDelay);
                }

                if (skippedMessages.length > 0) {
                    grandTotal -= skippedMessages.length;
                    offset += skippedMessages.length;
                    log.verb(`Encontrado ${skippedMessages.length} mensagens do sistema! Diminuindo o total geral para ${grandTotal} e aumentando o deslocamento para ${offset}.`);
                }
                
                log.verb(`Pesquisando próximas mensagens em ${searchDelay}ms...`, (offset ? `(offset: ${offset})` : '') );
                await wait(searchDelay);

                if (stopHndl && stopHndl()===false) return end(log.error('Operação abortada por você!'));

                return await recurse();
            } else {
                if (total - offset > 0) log.warn('Encerrado porque a API retornou vazio(ou seja, acabou!).');
                return end();
            }
        }

        log.success(`\nComeçou às ${start.toLocaleString()}`);
        log.debug(`IDdo Autor="${redact(authorId)}" ID do Servidor="${redact(guildId)}" ID do Canal="${redact(channelId)}" min Id="${redact(minId)}" max Id="${redact(maxId)}" Contendo Link=${!!hasLink} Contendo Arquivos=${!!hasFile}`);
        if (onProgress) onProgress(null, 1);
        return await recurse();
    }
})();

//FIM.
