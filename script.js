let associados = [];

        // Carregar dados ao iniciar
        window.onload = function() {
            carregarDados();
            atualizarListagem();
        };

        // Gerenciamento de Abas
        function showTab(event, tabName) {
             document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
             document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

             event.target.classList.add('active');
             document.getElementById(tabName).classList.add('active');

             if (tabName === 'listagem') {
                atualizarListagem();
            }
        }

        // Formatação de CPF
        document.getElementById('cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            }
        });

        // Adicionar Associado
        function adicionarAssociado(event) {
            event.preventDefault();
    
            const associado = {
                id: Date.now(),
                nome: document.getElementById('nome').value,
                idade: parseInt(document.getElementById('idade').value),
                sexo: document.getElementById('sexo').value,
                cpf: document.getElementById('cpf').value,
                matricula: document.getElementById('matricula').value,
                dataCadastro: new Date().toLocaleDateString('pt-BR')
            };

             if (confirm('Deseja realmente cadastrar este associado?')) {
             associados.push(associado);
             salvarDados();
             mostrarAlerta('Associado cadastrado com sucesso!', 'success');
             document.getElementById('formAssociado').reset();
             atualizarListagem();
             }
        }

        // Remover Associado
        function removerAssociado(id) {
            if (confirm('Deseja realmente remover este associado?')) {
                associados = associados.filter(a => a.id !== id);
                salvarDados();
                atualizarListagem();
                mostrarAlerta('Associado removido com sucesso!', 'success');
            }
        }

        // Atualizar Listagem
        function atualizarListagem() {
            const container = document.getElementById('listaAssociados');
            document.getElementById('totalAssociados').textContent = associados.length;
            
            if (associados.length === 0) {
                const mediaIdade = 0;
                document.getElementById('mediaIdade').textContent = mediaIdade;
                container.innerHTML = `
                    <div class="empty-state">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                        </svg>
                        <h3>Nenhum associado cadastrado</h3>
                        <p>Comece adicionando novos associados na aba de cadastro</p>
                    </div>
                `;
                return;
            }

            const mediaIdade = (associados.reduce((sum, a) => sum + a.idade, 0) / associados.length).toFixed(1);
            document.getElementById('mediaIdade').textContent = mediaIdade;

            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>CPF</th>
                            <th>Matrícula</th>
                            <th>Data Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            associados.forEach(a => {
                html += `
                    <tr>
                        <td>${a.nome}</td>
                        <td>${a.idade}</td>
                        <td>${a.sexo === 'M' ? 'Masculino' : a.sexo === 'F' ? 'Feminino' : 'Outro'}</td>
                        <td>${a.cpf}</td>
                        <td>${a.matricula}</td>
                        <td>${a.dataCadastro}</td>
                        <td>
                            <button class="btn-remove" onclick="removerAssociado(${a.id})">Remover</button>
                        </td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;

            container.innerHTML = html;
        }

        // Salvar dados em memória
        function salvarDados() {
            // Dados mantidos apenas em memória (variável associados)
        }

        // Carregar dados da memória
        function carregarDados() {
            // Dados já estão na variável associados
        }

        // Limpar todos os dados
        function limparDados() {
            if (confirm('ATENÇÃO: Isso irá remover TODOS os associados cadastrados. Deseja continuar?')) {
                associados = [];
                salvarDados();
                atualizarListagem();
                mostrarAlerta('Todos os dados foram removidos!', 'success');
            }
        }

        // Mostrar alerta
        function mostrarAlerta(mensagem, tipo) {
            const container = document.getElementById('alert-container');
            const alert = document.createElement('div');
            alert.className = `alert alert-${tipo}`;
            alert.textContent = mensagem;
            container.appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 3000);
        }