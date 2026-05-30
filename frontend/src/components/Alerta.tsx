interface AlertaProps{
    mensagem: { tipo: 'sucesso' | 'erro'; texto: string } | null;
}

export function Alerta({ mensagem }: AlertaProps){
    if(!mensagem) return null;
    return(
        <div style={{
            padding: '12px 16px',
            borderRadius: 'px',
            fontSize: '14px',
            backgroundColor: mensagem.tipo === 'sucesso' ? '#f0fdf4' : '#fef2f2',
            color: mensagem.tipo === 'sucesso' ? '#15803d' : '#dc2626',
            border: `1px solid ${mensagem.tipo === 'sucesso' ? '#bbf7d0' : '#fecaca'}`,
        }}>
            {mensagem.tipo === 'sucesso' ? '✅' : '❌'} {mensagem.texto}
        </div>
    )
}