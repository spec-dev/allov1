import { Spec, LiveTable, Property, Event, OnEvent, Address } from '@spec.dev/core'

@Spec({ 
    uniqueBy: ['address', 'chainId'] 
})
class VotingContract extends LiveTable {

    @Property()
    address: Address

    // ==== Event Handlers ===================
    
    @OnEvent('allov1.QFVotingStrategyFactory.VotingContractCreated')
    onVotingContractCreated(event: Event) {
        this.address = event.data.votingContractAddress
        this.addContractToGroup(this.address, 'allov1.QFVotingContract')
    }
}

export default VotingContract