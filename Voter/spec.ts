import { Spec, LiveTable, Property, Event, OnEvent, Address } from '@spec.dev/core'

/**
 * Unique voters across all rounds on Allo V1.
 */
@Spec({ 
    uniqueBy: ['address', 'chainId'] 
})
class Voter extends LiveTable {

    @Property()
    address: Address

    // ==== Event Handlers ===================
    
    @OnEvent('allov1.QFVotingStrategyFactory.VotingContractCreated')
    onVotingContractCreated(event: Event) {
        const round = event.data.votingContractAddress
        this.addContractToGroup(round, 'allov1.QFVotingContract')
    }

    @OnEvent('allov1.QFVotingContract.Voted') 
    onVoted(event: Event) {
        this.address = event.data.voter
    }
}

export default Voter