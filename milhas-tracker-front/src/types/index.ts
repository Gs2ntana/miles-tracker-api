export interface AquisicaoRequest{
    valorCompra: string;
    descricao: string;
    dataCompra: string;
    diasParaCredito: number;
    cartaoId:  number;
}

export interface AquisicaoResponse{
    id: number;
    dataCompra: string;
    valorCompra: number;
    descricao: string;
    pontosEsperados: number;
    dataPrevista: string;
    statusCredito: string;
    nomeCartao: string;
}

export interface CartaoRequest{
    nome: string;
    digitos: string;
    bandeiraId: number;
    programaPadraoId: number;
}

export interface CartaoResponse{
    id: number;
    nome: string;
    digitos: string;
    nomeBandeira: string;
    nomePrograma: string;
}

export interface DashboardResponse{
    mediaDiasParaCredito: number;
}

export interface ForgotRequest{
    email: string;
}

export interface HistoricoResponse{
    data: string;
    descricao: string;
    pontos: number;
    status: string;
}

export interface LoginRequest{
    email: string;
    senha: string;
}

export interface NotificacaoResponse{
    id: number;
    mensagem: string;
    dataEnvio: string;
    lida: boolean;
    aquisicaoId: number;
    aquisicaoDescricao: string;
}

export interface PontosResponse{
    nomeCartao: string;
    ultimosDigitos: string;
    totalPontos: number;
}

export interface RegisterRequest{
    nome: string;
    email: string;
    senha: string;
}

export interface ResetRequest{
    token: string;
    novaSenha: string;
}

export interface UpdateRequest{ 
    senhaAtual: string;
    novaSenha: string;
}   

export interface UsuarioUpRequest{
    nome: string;
}

export interface UsuarioResponse{
    id: number;
    nome: string;
    email: string;
}

export interface TokenResponse{
    token: string;
}